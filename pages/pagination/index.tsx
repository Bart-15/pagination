import { useDebounce } from "@/hooks/useDebounce";
import { useDidMountEffect } from "@/hooks/useDidMountEffect";
import { TTodo, TTodoQuery } from "@/types/todo.types";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import Head from "next/head";
import { useRouter } from 'next/router'
import { useState, useEffect } from "react";

const tHeadTableCell = ['id', 'title', 'completed'] as string[];

const Pagination = ({todos}: { todos: TTodo[]}) => {
    const router = useRouter();
    const { page, limit, q } = router.query;

    const [filteredData, setFilteredData] = useState({
        rowsPerpage: parseInt(limit as string) ||  10,
        page: parseInt(page as string) || 1
    });

    const [query, setQuery] = useState<string>(q as string || "");
    

    const debounceQuery = useDebounce<string>(query);

    useDidMountEffect(() => {
        router.replace({pathname:router.pathname, query:`q=${query}&page=${filteredData.page}&limit=${filteredData.rowsPerpage}`})            
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceQuery])


    function handleChangePage(event: unknown, newPage: number) {
        setFilteredData((prevVal) => ({
            ...prevVal,
            page: newPage
        }));
        
        router.replace({pathname:router.pathname, query:`q=${query}&page=${newPage}&limit=${filteredData.rowsPerpage}`})
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>){
        setFilteredData((prevVal) => ({
            ...prevVal,
            rowsPerpage: +event.target.value,
            page: 1
        }));
        router.replace({pathname: router.pathname, query:`q=${query}&page=1&limit=${+event.target.value}`})
    }
    
    return ( 
        <div>
            <Head>
                <title>SSR Pagination</title>
            </Head>
            <Container sx={{marginTop:'20px'}}>
            <TextField 
            type="text" 
            variant="outlined" 
            label="Search Here..." 
            size="small" 
            sx={{marginBottom:'10px'}} 
            value={query} 
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(event.target.value);
            }} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            {
                                tHeadTableCell.map(tableCell => 
                                <TableCell 
                                sx={{textTransform:'capitalize'}} 
                                key={tableCell}
                                >{tableCell}
                                </TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { todos.length === 0 && (<TableRow><TableCell colSpan={6}>No Records found</TableCell></TableRow>)}
                        {
                            todos.map((todo) => (
                                <TableRow key={todo.id}>
                                    <TableCell>{todo.id}</TableCell>
                                    <TableCell>{todo.title}</TableCell>
                                    <TableCell>{todo.completed === true ? 'Yes' : 'No'}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={200}
            rowsPerPage={filteredData.rowsPerpage}
            page={filteredData.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Container>
        </div>
    );
}

export default Pagination;


//getServerSideProps
export async function getServerSideProps({query}: {query: TTodoQuery}){
    const search = (query.q || '') as string;
    const rowsPerpage = (query.limit) as string || '10';
    const page = (query.page) as string || '0';


    const res = await fetch(`https://jsonplaceholder.typicode.com/todos?q=${search}&_page=${page}&_limit=${rowsPerpage}`);
    const data = await res.json() as TTodo[];
    return {
        props: { 
            todos: data 
        }
    }
}