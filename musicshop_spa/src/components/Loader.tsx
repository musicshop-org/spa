import React, {PureComponent} from 'react';

// const styles = () => ({
//     loaderContent: {
//         textAlign: 'center !important',
//     },
//     loaderMessageWrapper: {
//         marginTop: '6em',
//     },
//     loaderMessage: {
//         color: '#3056a8',
//     },
//     myText: {
//         fontFamily: 'Arial, Helvetica, sans-serif',
//         fontSize: '14px !important',
//     },
// });

class Loader extends PureComponent {
    render() {
        return (
            <div>
                <div>
                    <span>
                        {"Loading..."}
                    </span>
                </div>
            </div>
        );
    }
}

export default Loader;