<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use App\Models\Lapak;
use App\Models\Roti;
use App\Models\DataPenjualan;
use Illuminate\Http\Request;

class TransaksiController extends Controller
{
    public function readTransaksi()
    {
        $datas = Transaksi::select('id_transaksi', 'kode_lapak', 'kode_roti', 'jumlah_roti', 'id_kurir')->get();
      
        return response()->json($datas, 200);
    }

    public function lapakTransaksi()
    {
        $datas = Lapak::select('kode_lapak', 'nama_lapak')
        ->join('areadistribusi', 'lapak.area_id', '=', 'areadistribusi.area_id') // Lakukan join dengan tabel area
        ->select('lapak.nama_lapak','areadistribusi.area_distribusi') // Pilih kolom yang Anda inginkan
        ->get();
      
        return response()->json($datas, 200);
    }

    public function createTransaksi(Request $request, $kode_lapak)
    {
        $lapak = Lapak::where('kode_lapak', $kode_lapak)->first();
        // Validasi input
        $request->validate([
            'kode_roti' => 'required',
            'jumlah_roti' => 'required',
        ]);

        
        $roti = Roti::where('kode_roti', $request->kode_roti)->first();


        // Buat koordinator baru
        if ($lapak) {
            // Dapatkan 'id_kurir' dari 'lapak'
            $id_kurir = $lapak->id_kurir;

            if($roti) {
                 // Simpan data ke tabel 'transaksi' termasuk 'id_kurir' yang telah ditemukan
                Transaksi::create([
                    'kode_lapak' => $lapak->kode_lapak,
                    'kode_roti' => $roti->kode_roti,
                    'jumlah_roti' => $request->jumlah_roti,
                    'id_kurir' => $id_kurir,
                ]);

                $roti->stok_roti -= $request->jumlah_roti;
                $roti->save();

                return response()->json(['message' => 'Transaksi berhasil dibuat']);

            }

            return response()->json(['message' => 'Roti tidak ditemukan']);
        
           
        }
        return response()->json(['message' => 'Lapak tidak ditemukan']);
    }

    public function deleteTransaksi($id_transaksi)
{
    $transaksi = Transaksi::find($id_transaksi);

    if (!$transaksi) {
        return response()->json(['message' => 'Transaksi tidak ditemukan'], 404);
    }

    // Temukan data penjualan yang terkait dengan transaksi
    $dataPenjualan = DataPenjualan::where('id_transaksi', $id_transaksi)->get();

    // Hapus data penjualan terlebih dahulu
    foreach ($dataPenjualan as $penjualan) {
        $penjualan->delete();
    }

    // Kembalikan jumlah roti yang dibeli dalam transaksi ke stok awal
    $roti = Roti::where('kode_roti', $transaksi->kode_roti)->first();
    if ($roti) {
        $roti->stok_roti += $transaksi->jumlah_roti;
        $roti->save();
    }

    // Hapus transaksi dari database
    $transaksi->delete();

    return response()->json(['message' => 'Transaksi dan data penjualan terkait berhasil dihapus']);
}

}
