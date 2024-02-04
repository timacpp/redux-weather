import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { GlobalStyle } from './global-styles';
import { Game } from './game'

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />

            <Game />
        </ThemeProvider>
    );
}
