import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { GlobalStyle } from './global-styles';
import { Map } from './map'

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />

            <Map />
        </ThemeProvider>
    );
}
