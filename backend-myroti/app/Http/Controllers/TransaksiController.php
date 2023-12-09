<?php

namespace App\Http\Controllers;

use App\Models\Roti;
use App\Models\Lapak;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use App\Models\DataPenjualan;
use App\Models\Penghasilan;
use App\Models\TransaksiRoti;
use Illuminate\Support\Facades\Storage;

class TransaksiController extends Controller
{
    public function readTransaksi()
    {

        $datas = Transaksi::select('transaksi.id_transaksi', 'lapak.nama_lapak', 'transaksi.id_kurir', 'transaksi_roti.kode_roti', 'transaksi_roti.jumlah_roti', 'transaksi.status')
            ->join('transaksi_roti', 'transaksi.id_transaksi', '=', 'transaksi_roti.id_transaksi')
            ->join('lapak', 'transaksi.kode_lapak', '=', 'lapak.kode_lapak')
            ->get();

        return response()->json($datas, 200);
    }


    public function TransaksiKurir()
    {

        $datas = Transaksi::with(['transaksi_roti.roti', 'Lapak.Kurir'])->get();
    
        return response()->json($datas, 200);
    }
    



    public function lapakTransaksi()
    {
        // $lapakDalamTransaksi = Transaksi::distinct()->pluck('kode_lapak')->toArray();

        $datas = Lapak::where('status', 'enable')->with('Kurir')->get();

        return response()->json($datas, 200);
    }

    public function createRotiTransaki($kode_roti, $jumlah_roti, $id_transaksi)
    {
        $roti = Roti::where('kode_roti', $kode_roti)->first();

        if ($jumlah_roti <= $roti->stok_roti) {
            TransaksiRoti::create([
                'id_transaksi' => $id_transaksi,
                'kode_roti' => $kode_roti,
                'jumlah_roti' => $jumlah_roti
            ]);

            $roti->stok_roti -= $jumlah_roti; // Perbaikan: Menggunakan variabel $jumlah_roti
            $roti->save();
        }
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

            // Membuat transaksi
            $transaksi = Transaksi::create([
                'kode_lapak' => $lapak->kode_lapak,
                'id_kurir' => $id_kurir,
                'status' => 'ready'
            ]);

            // Ambil 'id_transaksi' yang baru saja dibuat
            $id_transaksi = $transaksi->id_transaksi;

            // Iterasi melalui semua kode_roti dan jumlah_roti yang diberikan
            foreach ($request->kode_roti as $key => $kode_roti) {
                $jumlah_roti = $request->jumlah_roti[$key];
                $this->createRotiTransaki($kode_roti, $jumlah_roti, $id_transaksi);
            }

            $lapak = Lapak::find($transaksi->kode_lapak);
            
            $lapak->status = 'disable';
            $lapak->save();

            return response()->json(['message' => 'Transaksi berhasil dibuat']);
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

    public function cekTransaksi($tanggal_pengiriman, $id_kurir){
        
        $transaksis = Transaksi::where('tanggal_pengiriman',  $tanggal_pengiriman)->where('id_kurir',  $id_kurir)->get();

        foreach($transaksis as $transaksi){
            if ($transaksi->status != 'delivered'){
                return false;
            }
        }

        return true;

    }

    public function createPenghasilan($tanggal_pengiriman, $id_kurir){
        $transaksis = Transaksi::where('tanggal_pengiriman',  $tanggal_pengiriman)->where('id_kurir',  $id_kurir)->get();

        $total = 0;

        foreach($transaksis as $transaksi){

            $transaksiroti = TransaksiRoti::where('id_transaksi',  $transaksi->id_transaksi)->get();

            foreach($transaksiroti as $roti){
                $total += $roti->jumlah_roti;
            }
        }

        $penghasilan = $total/300 * 50000;

        Penghasilan::create([
            'id_kurir' => $transaksi->id_kurir,
            'tanggal_pengiriman' => $tanggal_pengiriman,
            'penghasilan' => $penghasilan
        ]);

    }
    
    public function uploadbukti(Request $request, $id_transaksi)
    {
        $transaksi = Transaksi::find($id_transaksi);

        if (!$transaksi) {
            return response()->json(['message' => 'Transaksi tidak ditemukan'], 404);
        }

        $request->validate([
            'bukti_pengiriman' => 'required|image',
        ], [
            'bukti_pengiriman.required' => 'File bukti pengiriman diperlukan.',
            'bukti_pengiriman.image' => 'File bukti pengiriman harus berupa gambar.',
        ]);

        if ($request->hasFile('bukti_pengiriman')) {
            // Hapus bukti pengiriman sebelumnya jika ada
            if ($transaksi->bukti_pengiriman) {
                Storage::delete($transaksi->bukti_pengiriman);
            }
    
            $transaksi->bukti_pengiriman = basename($request->file('bukti_pengiriman')->store('bukti_pengiriman'));
            $transaksi->status = 'delivered';
            $transaksi->save();

            $lapak = Lapak::find($transaksi->kode_lapak);
            
            $lapak->status = 'enable';
            $lapak->save();

            if($this->cekTransaksi($transaksi->tanggal_pengiriman, $transaksi->id_kurir)){
                $this->createPenghasilan($transaksi->tanggal_pengiriman, $transaksi->id_kurir);
            }

            return response()->json(['message' => 'Bukti pengiriman berhasil diunggah']);
        } else {
            return response()->json(['message' => 'Tidak ada file bukti pengiriman yang diunggah'], 400);
        }
    }

    public function getImage($path)
    {
        // Pastikan path sesuai dengan struktur penyimpanan Anda
        $path = 'bukti_pengiriman/' . $path;

        // Periksa apakah file ada
        if (Storage::exists($path)) {
            // Dapatkan konten gambar
            $content = Storage::get($path);

            // Dapatkan tipe konten
            $mimeType = Storage::mimeType($path);

            // Langsung kembalikan respons HTTP
            return response($content)->header('Content-Type', $mimeType);
        } else {
            // Jika file tidak ditemukan, kembalikan respons 404 (not found)
            return response()->json(['message' => 'File not found'], 404);
        }
    }

    public function kurirDeliver (Request $request, $id_transaksi){

        $transaksi = Transaksi::find($id_transaksi);

        if (!$transaksi) {
            return response()->json(['message' => 'Transaksi tidak ditemukan'], 404);
        }

        $request->validate([
            'status' => 'required',
        ]);

        $transaksi->status = $request->status;
        $transaksi->save();
        return response()->json(['message' => 'Status berhasil terubah']);
    }


    public function cekbukti(Request $request)
    {
        return $request->file;
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
