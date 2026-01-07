mapboxgl.accessToken = mapToken;

const coords = listing.geometry.coordinates;

/* 🔥 detect mobile ONLY */
const isMobile = window.matchMedia("(max-width: 768px)").matches;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: coords,
  zoom: isMobile ? 11 : 12   // 👈 desktop unchanged
});

/* ================= CONTROLS ================= */

/* Disable scroll zoom only on mobile */
if (isMobile) {
  map.scrollZoom.disable();
}

/* Desktop behavior unchanged */
map.addControl(new mapboxgl.NavigationControl(), "top-right");

/* ================= POPUP ================= */

const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
  <h5 style="margin:0;font-weight:600;">${listing.title}</h5>
  <p style="margin:0;font-size:0.85rem;">
    Exact location after booking
  </p>
`);

/* ================= MARKER ================= */

new mapboxgl.Marker({ color: "red" })
  .setLngLat(coords)
  .setPopup(popup)
  .addTo(map);

/* ================= ANIMATION ================= */

/* SAME animation desktop, lighter only on mobile */
map.on("load", () => {
  map.flyTo({
    center: coords,
    zoom: isMobile ? 11 : 11,   // 👈 SAME final zoom
    speed: isMobile ? 0.6 : 0.8
  });
});
