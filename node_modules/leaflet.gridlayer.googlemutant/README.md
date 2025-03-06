# Leaflet.GridLayer.GoogleMutant

A [LeafletJS](http://leafletjs.com/) plugin to use Google maps basemaps.

## Demo

[https://ivansanchez.gitlab.io/Leaflet.GridLayer.GoogleMutant/demo.html](https://ivansanchez.gitlab.io/Leaflet.GridLayer.GoogleMutant/demo.html)

## Compatibility

-   This plugin doesn't work on IE10 or lower, as [that browser doesn't implement DOM mutation observers](https://caniuse.com/#feat=mutationobserver). Chrome, Firefox, Safari, IE11 and Edge are fine.

-   Starting with v0.11.0, the code relies on `Symbol` and `Map`. IE11 and [browsers that don't support `Symbol`](https://www.caniuse.com/mdn-javascript_builtins_symbol) or [don't support `Map`](https://www.caniuse.com/mdn-javascript_builtins_map) also need polyfills to work.

-   The `maxNativeZoom` functionality introduced in v0.5.0 (thanks, @luiscamacho!) requires Leaflet >1.0.3.

## Usage

Include the GMaps JS API in your HTML, plus Leaflet:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY" async defer></script>
<link
	rel="stylesheet"
	href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
	integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
	crossorigin=""
/>
<script
	src="https://unpkg.com/leaflet@1.7.1/dist/leaflet-src.js"
	integrity="sha512-I5Hd7FcJ9rZkH7uD01G3AjsuzFy3gqz7HIJvzFZGFt2mrCS4Piw9bYZvCgUE0aiJuiZFYIJIwpbNnDIM6ohTrg=="
	crossorigin=""
></script>
```

Include the GoogleMutant javascript file:

```html
<script src="https://unpkg.com/leaflet.gridlayer.googlemutant@latest/dist/Leaflet.GoogleMutant.js"></script>
```

Then, you can create an instance of `L.GridLayer.GoogleMutant` on your JS code:

```javascript
var roads = L.gridLayer
	.googleMutant({
		type: "roadmap", // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
	})
	.addTo(map);
```

It's also possible to use [custom styling](https://developers.google.com/maps/documentation/javascript/styling)
by passing a value to the `styles` option, e.g.:

```javascript
var styled = L.gridLayer
	.googleMutant({
		type: "roadmap",
		styles: [
			{ elementType: "labels", stylers: [{ visibility: "off" }] },
			{ featureType: "water", stylers: [{ color: "#444444" }] },
		],
	})
	.addTo(map);
```

## Installing a local copy

If you don't want to rely on a CDN to load GoogleMutant, you can:

-   Fetch it with [NPM](https://www.npmjs.com/) by running `npm install --save leaflet.gridlayer.googlemutant`.
-   Fetch it with [Yarn](https://yarnpkg.com/) by running `yarn add leaflet.gridlayer.googlemutant`.
-   We discourage using [Bower](https://bower.io/) but, if you must, `bower install https://gitlab.com/IvanSanchez/Leaflet.GridLayer.GoogleMutant.git`.

You can also download a static copy from the CDN, or clone this git repo.

## Known caveats

-   `hybrid` mode prunes tiles before needed for no apparent reason, so the map flickers when there is a zoom change.

-   Even though imagery exists at zoom levels up to 23, GoogleMutant caps the max zoom level at 21.

    This is to prevent scenarios where detecting imagery at those zooms levels is hard and creates problems (e.g. when zooming in/out close to a the boundary of such hi-res imagery).

    You can override this (at your own risk!) by using the `maxZoom` option with a value larger than 21.

-   GoogleMutant is meant to provide a reliable (and ToC-compliant) way of loading Google Map's tiles into Leaflet, nothing more.

    This means that route finding, geocoding, POI info, streetview, KML support, and in general anything that depends on calls to the Google Maps API are **not** implemented and are **not** a priority.

## Motivation

Before GoogleMutant, it was already possible to display Google Maps in Leaflet, but unfortunately the state of the art was far from perfect:

-   [Shramov's Leaflet plugin implementation](https://github.com/shramov/leaflet-plugins) (as well as an old, not recommended [OpenLayers technique](http://openlayers.org/en/v3.0.0/examples/google-map.html)) suffer from a [big drawback](https://github.com/shramov/leaflet-plugins/issues/111): the basemap and whatever overlays are on top are _off sync_. This is very noticeable when dragging or zooming.
-   [MapGear's implementation with OpenLayers](https://github.com/mapgears/ol3-google-maps) uses a different technique (decorate OL3 with GMaps methods), but has a different set of [limitations](https://github.com/mapgears/ol3-google-maps/blob/master/LIMITATIONS.md).
-   [Avin Mathew's implementation](https://avinmathew.com/leaflet-and-google-maps/) uses a clever timer-based technique, but it requires jQuery and still feels jittery due to the timers.

Before, an instance of the Google Maps JS API was displayed behind the Leaflet container, and synchronized as best as it could be done.

Now, in order to provide the best Leaflet experience, GoogleMutant uses both [DOM mutation observers](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) and `L.GridLayer` from Leaflet 1.0.0. The basemap tiles are still requested _through_ the Google maps JavaScript API, but they switch places to use Leaflet drag and zoom.

## Legalese

---

"THE BEER-WARE LICENSE":
<ivan@sanchezortega.es> wrote this file. As long as you retain this notice you
can do whatever you want with this stuff. If we meet some day, and you think
this stuff is worth it, you can buy me a beer in return.

---
