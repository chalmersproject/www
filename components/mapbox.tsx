import React, { FC, useContext, useEffect, useMemo } from "react";

import mapboxgl from "mapbox-gl";
import { GeolocateControl as MapboxGeolocateControl } from "mapbox-gl";

import MapboxGL, { MapContext } from "react-mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
export * from "react-mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
if (!MAPBOX_TOKEN) {
  throw new Error("Missing MapBox token.");
}

export const Map = MapboxGL({
  accessToken: MAPBOX_TOKEN,
});

export const Geocoder: FC = ({}) => {
  const map = useContext(MapContext);
  const control = useMemo(
    () =>
      new MapboxGeocoder({
        mapboxgl,
        accessToken: MAPBOX_TOKEN,
        marker: false,
        flyTo: { speed: 3 },
      }),
    [],
  );
  useEffect(() => {
    map?.addControl(control);
  }, [map]);
  return null;
};

export const GeolocateControl: FC = ({}) => {
  const map = useContext(MapContext);
  const control = useMemo(
    () =>
      new MapboxGeolocateControl({
        trackUserLocation: true,
        fitBoundsOptions: { speed: 3 },
      }),
    [],
  );
  useEffect(() => {
    map?.addControl(control);
  }, [map]);
  return null;
};

export const MapboxStyles: FC = () => {
  return (
    <style jsx global>{`
      .mapboxgl-map {
        font-family: inherit !important;
      }
      .mapboxgl-ctrl-geocoder {
        font-family: inherit !important;
      }
    `}</style>
  );
};
