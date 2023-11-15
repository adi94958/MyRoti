<?php

namespace App\Http\Controllers;

use App\Models\Roti;
use App\Models\Lapak;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use App\Models\DataPenjualan;
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

        $datas = Lapak::where('status', 'enable')
            ->join('areadistribusi', 'lapak.area_id', '=', 'areadistribusi.area_id')
            ->join('kurirs', 'lapak.id_kurir', '=', 'kurirs.id_kurir')
            ->select('lapak.kode_lapak', 'lapak.nama_lapak', 'areadistribusi.area_distribusi', 'kurirs.nama')
            ->get();

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
            
            $lapak->status = 'disable';
            $lapak->save();

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

    // public function uploadbukti(Request $request, $id_transaksi){

    //     return $request->file;

    //     $transaksi = Transaksi::find($id_transaksi);

    //     if (!$transaksi) {
    //         return response()->json(['message' => 'Transaksi tidak ditemukan'], 404);
    //     }

    //     $request->validate([
    //         'bukti_pengiriman' => 'required|image',
    //     ], [
    //         'bukti_pengiriman.required' => 'File bukti pengiriman diperlukan.',
    //         'bukti_pengiriman.image' => 'File bukti pengiriman harus berupa gambar.',
    //     ]);

    //     if ($request->hasFile('bukti_pengiriman')) {
    //         // Baca data biner dari file gambar yang diunggah
    //         $imageData = file_get_contents($request->file('bukti_pengiriman')->getRealPath());

    //         // Simpan data biner ke kolom 'bukti_pengiriman'
    //         $transaksi->bukti_pengiriman = $imageData;

    //         $transaksi->status = 'delivered';
    //         $transaksi->save();

    //         return response()->json(['message' => 'Bukti berhasil diunggah']);
    //     } else {
    //         return response()->json(['message' => 'Tidak ada file bukti pengiriman yang diunggah'], 400);
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

    public function RiwayatTransaksiKurir()
    {
        // $idKurir = session('id_kurir');

        $riwayatKurir = Transaksi::where('status', 'finished')
            // ->where('transaksi.id_kurir', $idKurir) 
            ->join('lapak', 'transaksi.kode_lapak', '=', 'lapak.kode_lapak')
            ->leftjoin('datapenjualan', 'transaksi.id_transaksi', '=', 'datapenjualan.id_transaksi')
            ->select('lapak.nama_lapak', 'lapak.alamat_lapak', 'datapenjualan.catatan_penjual', 'transaksi.status')
            ->get();

        return response()->json($riwayatKurir);
    }
}
