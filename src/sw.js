import { manifest, version } from '@parcel/service-worker';

async function install() {
    const cache = await caches.open(version);
    await cache.addAll(manifest);
}
addEventListener('install', e => e.waitUntil(install()));

async function activate() {
    const keys = await caches.keys();
    await Promise.all(
        keys.map(key => key !== version && caches.delete(key))
    );
}
addEventListener('activate', e => e.waitUntil(activate()));

async function fetch() {
    const request = event.request;
    const cache = await caches.open(version);
    const response = await cache.match(request);
    if (response) {
        return response;
    }
    const networkResponse = await fetch(request);
    if (networkResponse) {
        await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
}
addEventListener('fetch', e => e.respondWith(fetch()));