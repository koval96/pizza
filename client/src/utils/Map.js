import React, { useState, useEffect } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";

export const MapDiv = (props) => {
  const [addressName, setAddressName] = useState();
  const [mapCenter, setMapCenter] = useState([56.326887, 44.005986]);
  const getCoords = (e) => {
    setMapCenter(e.get("coords"));
    window.ymaps.geocode(e.get("coords")).then((res) => {
      let firstGeoObject = res.geoObjects.get(0);
      setAddressName(firstGeoObject.getAddressLine());
      props.setAdress(firstGeoObject.getAddressLine());
      const a = window.ymaps.geolocation
        .get({
          provider: "yandex",
          mapStateAutoApply: true,
        })
        .then(function (result) {
          const addresCoords = result.geoObjects
            .get(0)
            .properties.get("boundedBy");
          const adressText = result.geoObjects.get(0).properties.get("text");
        });
    });
  };

  const mapState = {
    center: mapCenter,
    zoom: 11,
  };

  return (
    <div>
      <YMaps
        query={{
          apikey: "83253a05-8a17-4325-b40c-2c5a1e3917c0",
          ns: "ymaps",
        }}
      >
        <Map
          state={mapState}
          modules={["geolocation", "geocode"]}
          onClick={(e) => getCoords(e)}
        ></Map>
      </YMaps>
    </div>
  );
};
