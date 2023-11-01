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

    // public function lapakTransaksi()
    // {
    //     $datas = Lapak::select('kode_lapak', 'nama_lapak')
    //     ->join('areadistribusi', 'lapak.area_id', '=', 'areadistribusi.area_id') // Lakukan join dengan tabel area
    //     ->select('lapak.nama_lapak','areadistribusi.area_distribusi') // Pilih kolom yang Anda inginkan
    //     ->get();

    //     return response()->json($datas, 200);
    // }

    public function lapakTransaksi()
    {
        $lapakDalamTransaksi = Transaksi::distinct()->pluck('kode_lapak')->toArray();

        $datas = Lapak::select('kode_lapak', 'nama_lapak')
            //->join('areadistribusi', 'lapak.area_id', '=', 'areadistribusi.area_id')
            ->join('kurirs', 'lapak.id_kurir', '=', 'kurirs.id_kurir')
            ->select('lapak.kode_lapak', 'lapak.nama_lapak', 'kurirs.nama')
            ->whereNotIn('kode_lapak', $lapakDalamTransaksi) // Tambahkan ini untuk mengabaikan lapak dalam transaksi
            ->get();

        return response()->json($datas, 200);
    }


    public function createTransaksi(Request $request, $kode_lapak)
    {
        $lapak = Lapak::where('kode_lapak', $kode_lapak)->first();
        // Validasi input
        $request->validate([
            'kode_roti.*' => 'required',
            'jumlah_roti.*' => 'required',
        ]);

        // Buat koordinator baru
        if ($lapak) {

            // Dapatkan 'id_kurir' dari 'lapak'
            $id_kurir = $lapak->id_kurir;
            $transaksiData = [];
            $rotiNotFound = [];

            // Iterasi melalui semua kode_roti dan jumlah_roti yang diberikan
            foreach ($request->kode_roti as $key => $kode_roti) {
                $jumlah_roti = $request->jumlah_roti[$key];

                // Cari Roti berdasarkan kode_roti
                $roti = Roti::where('kode_roti', $kode_roti)->first();

                if ($roti) {
                    // Simpan data ke tabel 'transaksi' termasuk 'id_kurir' yang telah ditemukan
                    $transaksiData[] = [
                        'kode_lapak' => $lapak->kode_lapak,
                        'kode_roti' => $roti->kode_roti,
                        'jumlah_roti' => $jumlah_roti, // Perbaikan: Menggunakan variabel $jumlah_roti
                        'id_kurir' => $id_kurir,
                    ];

                    $roti->stok_roti -= $jumlah_roti; // Perbaikan: Menggunakan variabel $jumlah_roti
                    $roti->save();
                } else {
                    $rotiNotFound[] = $kode_roti;
                }
            }

            Transaksi::insert($transaksiData);

            if (!empty($rotiNotFound)) {
                return response()->json(['message' => 'Beberapa kode roti tidak ditemukan: ' . implode(', ', $rotiNotFound)]);
            } else {
                return response()->json(['message' => 'Transaksi berhasil dibuat']);
            }
        } else {
            return response()->json(['message' => 'Lapak tidak ditemukan']);
        }
    }

    // public function createTransaksi(Request $request, $kode_lapak)
    // {
    //     $lapak = Lapak::where('kode_lapak', $kode_lapak)->first();
    //     // Validasi input
    //     $request->validate([
    //         'kode_roti.*' => 'required',
    //         'jumlah_roti.*' => 'required',
    //     ]);

    //     // Buat koordinator baru
    //     if ($lapak) {
    //         // Dapatkan 'id_kurir' dari 'lapak'
    //         $id_kurir = $lapak->id_kurir;
    //         $transaksiData = [];
    //         $rotiNotFound = [];

    //         // Iterasi melalui semua kode_roti dan jumlah_roti yang diberikan
    //         foreach ($request->kode_roti as $key => $kode_roti) {
    //             $jumlah_roti = $request->jumlah_roti[$key];

    //             // Cari Roti berdasarkan kode_roti
    //             $roti = Roti::where('kode_roti', $kode_roti)->first();

    //             if ($roti) {
    //                 // Simpan data ke tabel 'transaksi' termasuk 'id_kurir' yang telah ditemukan
    //                 $transaksiData[] = [
    //                     'kode_lapak' => $lapak->kode_lapak,
    //                     'kode_roti' => $roti->kode_roti,
    //                     'jumlah_roti' => $jumlah_roti, // Perbaikan: Menggunakan variabel $jumlah_roti
    //                     'id_kurir' => $id_kurir,
    //                 ];

    //                 $roti->stok_roti -= $jumlah_roti; // Perbaikan: Menggunakan variabel $jumlah_roti
    //                 $roti->save();
    //             } else {
    //                 $rotiNotFound[] = $kode_roti;
    //             }
    //         }

    //         Transaksi::insert($transaksiData);

    //         if (!empty($rotiNotFound)) {
    //             return response()->json(['message' => 'Beberapa kode roti tidak ditemukan: ' . implode(', ', $rotiNotFound)]);
    //         } else {
    //             return response()->json(['message' => 'Transaksi berhasil dibuat']);
    //         }
    //     } else {
    //         return response()->json(['message' => 'Lapak tidak ditemukan']);
    //     }
    // }


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
