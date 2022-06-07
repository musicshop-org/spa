import * as React from 'react';
import {alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import {visuallyHidden} from '@mui/utils';
import {SongDTO} from "../openAPI";
import {Button, Grid} from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface Data {
    index: number;
    title: string;
    artist: string;
    genre: string;
    releaseDate: string;
}

function createData(
    index: number,
    title: string,
    artist: string,
    genre: string,
    releaseDate: string,
): Data {
    return {
        index,
        title,
        artist,
        genre,
        releaseDate,
    };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'index',
        numeric: false,
        disablePadding: true,
        label: '#',
    },
    {
        id: 'title',
        numeric: false,
        disablePadding: false,
        label: 'Title',
    },
    {
        id: 'artist',
        numeric: false,
        disablePadding: false,
        label: 'Artist',
    },
    {
        id: 'genre',
        numeric: false,
        disablePadding: false,
        label: 'Genre',
    },
    {
        id: 'releaseDate',
        numeric: false,
        disablePadding: false,
        label: 'Release Date',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>

                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        width={headCell.id === 'index' ? '1%' : 'auto'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>

                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const {numSelected} = props;

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Playlist of {localStorage.getItem("user")}
                </Typography>
            )}
        </Toolbar>
    );
};

function getSelectedSongDTOs(songDTOs: any, selected: readonly string[]): Array<any> {
    let selectedSongs: Array<any> = new Array<any>();
    for (const index in selected) {
        selectedSongs.push(songDTOs.songDTOs.find((song: SongDTO) => song.title === selected[index]));
    }
    return selectedSongs;
}

function Playlist(songDTOs: any) {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('index');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);

    // const downloadMicroservice_url: string = 'http://localhost:9000/'
    const downloadMicroservice_url: string = 'http://3.93.167.93/'

    let rows: Data[] = [];
    if (songDTOs != null && songDTOs.songDTOs != null) {
        for (let i = 0; i < songDTOs.songDTOs.length; i++) {

            let artistConcat: string = concatArtist(songDTOs, i)

            rows.push(createData(
                          i + 1,
                                songDTOs.songDTOs[i].title,
                                artistConcat,
                                songDTOs.songDTOs[i].genre,
                                songDTOs.songDTOs[i].releaseDate,
            ))
        }
    }

    function concatArtist (songDTOs: any, i: number) {
        let artistConcat: string = ""

        for (let j = 0; j < songDTOs.songDTOs[i].artists.length; j++) {

            if (artistConcat !== "")
                artistConcat = artistConcat.concat(", ")

            artistConcat = artistConcat.concat(songDTOs.songDTOs[i].artists[j].name)
        }

        return artistConcat
    }

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.title);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setDense(event.target.checked);
    // };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <EnhancedTableToolbar numSelected={selected.length}/>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can
                                replace the `stableSort` call with:
                                rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.title);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.title)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.title}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.index}
                                            </TableCell>
                                            <TableCell>
                                                {row.title}
                                            </TableCell>
                                            <TableCell>
                                                {row.artist}
                                            </TableCell>
                                            <TableCell>
                                                {row.genre}
                                            </TableCell>
                                            <TableCell>
                                                {row.releaseDate}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Grid container alignItems={"flex-end"}
                  justifyContent={"flex-end"}>

                {(selected.length > 0) ? (
                    <>
                        <Grid item>
                            <Typography align={"right"} variant={"h6"}>
                            </Typography>

                            <Button variant={"text"} endIcon={<FileDownloadIcon/>} onClick={() => {
                                downloadSongs(getSelectedSongDTOs(songDTOs, selected))
                            }}>
                                Download {selected.length} {(selected.length === 1) ? 'Song' : 'Songs'}
                            </Button>
                        </Grid>
                    </>) : (<div></div>)}

            </Grid>
        </Box>
    );

    function downloadSongs(songs: any) {
        let token: string | null = localStorage.getItem('jwt')
        let i = 0

        while (i < songs.length) {

            let songId: number = songs[i].id
            let songTitle: string = songs[i].title
            let ok: boolean = false

            let action = "download/" + songs[i].longId

            fetch(`${downloadMicroservice_url}${action}`, {
                method: 'GET',
                headers: new Headers({
                    "Authorization": token != null ? token : ""
                })
            })
                .then(response => {
                    response.status === 200 ? ok = true : ok = false
                    return response
                })
                .then(response => response.blob())
                .then(blob => {

                    if (ok) {
                        var url = window.URL.createObjectURL(blob);
                        var a = document.createElement('a');
                        a.href = url;
                        a.download = songTitle + ".mp3";
                        document.body.appendChild(a); // append the element to the dom
                        a.click();
                        a.remove();  // remove the element again
                    }
                });
            i++
        }
    }
}

export default Playlist;
