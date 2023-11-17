<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\DataPenjualan;

class RiwayatTransaksiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function detailRoti($idTransaksi)
    {
        try {
            $transaksi = Transaksi::with([
                'lapak',
                'transaksi_roti.roti',
                'dataPenjualan.rotibasi'
            ])->find($idTransaksi);
    
            if (!$transaksi) {
                throw new \Exception('Transaksi not found');
            }
    
            $lapak = $transaksi->lapak;
    
            $detailRoti = $transaksi->transaksi_roti->map(function ($item) {
                return [
                    'nama_roti' => $item->roti->nama_roti,
                    'jumlah_roti' => $item->jumlah_roti,
                ];
            });
    
            $detailRotiBasi = $transaksi->dataPenjualan->rotibasi->map(function ($rotiBasi) {
                return [
                    'nama_roti' => $rotiBasi->roti->nama_roti,
                    'jumlah_roti_basi' => $rotiBasi->jumlah_roti
                ];
            });
    
            $combinedDetailRoti = $detailRoti->concat($detailRotiBasi)
                ->groupBy('nama_roti')
                ->map(function ($items) {
                    return [
                        'nama_roti' => $items->first()['nama_roti'],
                        'jumlah_roti' => $items->sum('jumlah_roti'),
                        'jumlah_roti_basi' => $items->sum('jumlah_roti_basi')
                    ];
                })->values();  // Add this line to reindex the array keys
    
            // Pindahkan pernyataan ini ke tempat yang sesuai
            $combinedDetailRoti = $combinedDetailRoti->values()->all();
            
            Log::info('Pesan log');
    
            return response()->json(['detail_roti' => $combinedDetailRoti]);
        } catch (\Exception $e) {
            // Tangkap kesalahan secara eksplisit dan kembalikan pesan khusus
            Log::error('Error in detailRoti: ' . $e->getMessage());
            return response()->json(['error' => 'Data roti tidak ada'], 500);
        }
    }
    
    
        
    /**
     * Display the specified resource.
     */
    public function RiwayatTransaksiKurir()
    {
        // $idKurir = session('id_kurir');

        //general
        $riwayatKurir = Transaksi::where('status', 'finished')
            // ->where('transaksi.id_kurir', $idKurir) 
            ->join('lapak', 'transaksi.kode_lapak', '=', 'lapak.kode_lapak')
            ->leftjoin('datapenjualan', 'transaksi.id_transaksi', '=', 'datapenjualan.id_transaksi')
            ->select('lapak.nama_lapak', 'lapak.alamat_lapak', 'datapenjualan.catatan_penjual', 'transaksi.status')
            ->get();

        return response()->json($riwayatKurir);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaksi $transaksi)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaksi $transaksi)
    {
        //
    }
}
