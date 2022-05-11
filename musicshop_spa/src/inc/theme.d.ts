import {Theme, ThemeOptions} from '@mui/material/styles'

declare module '@mui/material/styles' {
    interface CustomTheme extends Theme {
        components: {
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: boolean,
                },
            },
        },
        mixins: {
            toolbar: {
                input: {
                    fontFamily: string,
                    fontSize: string,
                },
            }
        },
        defaultSearchInput: {
            width: string,
        }
    }

    interface CustomThemeOptions extends ThemeOptions {
        components?: {
            MuiButtonBase?: {
                defaultProps?: {
                    disableRipple?: boolean,
                },
            },
        },
        mixins?: {
            toolbar?: {
                input?: {
                    fontFamily?: string,
                    fontSize?: string,
                },
            }
        },
        defaultSearchInput?: {
            width?: string,
        }
    }

    export function createTheme(options?: CustomThemeOptions): CustomTheme;
}
