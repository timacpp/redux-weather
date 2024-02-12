import styled from 'styled-components';

export const MapContainerWrapper = styled.div`
.leaflet-layer,
.leaflet-control-zoom-in,
.leaflet-control-zoom-out,
.leaflet-control-attribution {
  filter: invert(${props => props.theme.invert}%) hue-rotate(${props => props.theme.huerotate}deg) brightness(95%) contrast(90%);
}
`
export const darkTheme = {
    invert: 100,
    huerotate: 180
}

export const lightTheme = {
    invert: 0,
    huerotate: 0
}