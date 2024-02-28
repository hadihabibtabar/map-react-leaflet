// import React,{useState ,useCallback, useRef,useMemo} from 'react'
// import {Popup,Marker } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'

// function MarkerSign(markerPosition) {
//     const [draggable, setDraggable] = useState(false)
//     const [position, setPosition] = useState(markerPosition)
//     const markerRef = useRef(null)
//     const eventHandlers = useMemo(
//       () => ({
//         dragend() {
//           const marker = markerRef.current
//           if (marker != null) {
//             setPosition(marker.getLatLng())
//           }
//         },
//       }),
//       [],
//     )
//     const toggleDraggable = useCallback(() => {
//       setDraggable((d) => !d)
//     }, [])
  
//     return (
//       <Marker
//         draggable={draggable}
//         eventHandlers={eventHandlers}
//         position={position}
//         ref={markerRef}>
//         <Popup minWidth={90}>
//           <span onClick={toggleDraggable}>
//             {draggable
//               ? 'Marker is draggable'
//               : 'Click here to make marker draggable'}
//           </span>
//         </Popup>
//       </Marker>
//     )
// }

// export default MarkerSign;




