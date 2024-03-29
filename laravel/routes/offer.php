<?php


Route::middleware('auth:sanctum')->group(function () {

    Route::group(['prefix' => 'offers'], function () {
        Route::get('/', [\App\Http\Controllers\Api\OfferController::class, 'index'])->name('offer.index');
        Route::post('/create', [\App\Http\Controllers\Api\OfferController::class, 'store'])->name('offer.create');
        Route::get('/{offer}', [\App\Http\Controllers\Api\OfferController::class, 'show'])->name('offer.show');
        Route::post('/{offer}/update', [\App\Http\Controllers\Api\OfferController::class, 'update'])->name('offer.update');
        Route::delete('/{offer}/delete', [\App\Http\Controllers\Api\OfferController::class, 'destroy'])->name('offer.delete');
    });
});
