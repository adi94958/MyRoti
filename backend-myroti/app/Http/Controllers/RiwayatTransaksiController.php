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
    public function readDataPenjualan()
{
    $datas = DataPenjualan::select('datapenjualan.tanggal_pengambilan', 'datapenjualan.uang_setoran', 'datapenjualan.id_transaksi', 'lapak.nama_lapak', 'lapak.alamat_lapak', 'transaksi.status', 'transaksi.id_kurir', 'transaksi.tanggal_pengiriman', 'kurirs.nama')

        ->join('transaksi', 'datapenjualan.id_transaksi', '=', 'transaksi.id_transaksi')
        ->join('lapak', 'transaksi.kode_lapak', '=', 'lapak.kode_lapak')
        ->join('kurirs', 'transaksi.id_kurir', '=', 'kurirs.id_kurir')
        ->get();

    return response()->json($datas, 200);
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

        $datas = DataPenjualan::with(['rotibasi.roti', 'transaksi.lapak.kurir', 'transaksi.transaksi_roti.roti'])->get();
    
        return response()->json($datas, 200);
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
