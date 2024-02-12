import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './global-styles';
import { Map } from './map'

const theme = {
    background: "#3e3e42"
}

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />

            <Map />
        </ThemeProvider>
    );
}
