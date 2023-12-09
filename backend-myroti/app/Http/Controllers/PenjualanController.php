<?php

namespace App\Http\Controllers;

use App\Models\Roti;
use App\Models\RotiBasi;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use App\Models\DataPenjualan;
use App\Models\TransaksiRoti;

class PenjualanController extends Controller
{
    public function readDataPenjualan()
    {
    }

    public function createRotiBasi($kode_roti, $jumlah_roti, $id_penjualan, $id_transaksi)
    {
        $roti = TransaksiRoti::where('id_transaksi', $id_transaksi)
            ->where('kode_roti', $kode_roti)
            ->first();

        if ($roti) {
            RotiBasi::create([
                'id_penjualan' => $id_penjualan,
                'kode_roti' => $kode_roti,
                'jumlah_roti' => $jumlah_roti
            ]);
            // tambahkan logika jika RotiBasi berhasil dibuat

        }
    }

    public function hitungUangSetoran($kode_roti, $jumlah_roti)
    {
        $jumlahharga = 0;

        $roti = Roti::where('kode_roti', $kode_roti)->first();

        if ($roti) {
            $jumlahharga = $roti->harga_satuan_roti * $jumlah_roti;

            return $jumlahharga;
        } else {

            return response()->json(['message' => 'Tidak ada roti tersebut']);
        }
    }

    public function totalharga($id_transaksi)
    {
        // $transaksi = Transaksi::where('id_transaksi', $id_transaksi)->first();

        $transaksiroti = TransaksiRoti::where('id_transaksi',  $id_transaksi)->get();

        $total = 0;

        foreach ($transaksiroti as $roti) {
            $kode_roti = $roti->kode_roti;
            $jumlah_roti = $roti->jumlah_roti;

            $total += $this->hitungUangSetoran($kode_roti, $jumlah_roti);
        }

        return $total;
    }




    public function createPenjualan(Request $request, $id_transaksi)
    {
        // $transaksi = Transaksi::where('id_transaksi', $id_transaksi)->first();
        $transaksi = Transaksi::find($id_transaksi);
        // Validasi input
        $request->validate([
            'kode_roti.*',
            'jumlah_roti.*',
            'catatan_penjual',
            'total_harga'  => 'required',
            'total_dengan_rotibasi'  => 'required',
            'uang_setoran' => 'required',
        ]);

        // Buat koordinator baru
        if ($transaksi) {
            // Membuat transaksi
            $datapenjualan = DataPenjualan::create([
                'id_transaksi' => $transaksi->id_transaksi,
                'catatan_penjual' => $request->catatan_penjual,
                'total_harga' => $request->total_harga,
                'total_dengan_rotibasi' => $request->total_dengan_rotibasi,
                'uang_setoran' => $request->uang_setoran
            ]);

            // Ambil 'id_transaksi' yang baru saja dibuat
            $id_penjualan = $datapenjualan->id_penjualan;


            // Iterasi melalui semua kode_roti dan jumlah_roti yang diberikan
            foreach ($request->kode_roti as $key => $kode_roti) {
                $jumlah_roti = $request->jumlah_roti[$key];
                $this->createRotiBasi($kode_roti, $jumlah_roti, $id_penjualan, $id_transaksi);
            }

            $transaksi->status = 'finished';
            $transaksi->save();


            return response()->json(['message' => 'Data Penjualan berhasil dibuat']);
        } else {
            return response()->json(['message' => 'Transaksi tidak ditemukan']);
        }
    }
}
