import { Grid } from "@mui/material";

type Props = {
    children: string | JSX.Element | JSX.Element[]
}

const GridCenter = ({children}: Props) => {
    return ( 
        <Grid container justifyContent="center" sx={{padding:'15px 30px'}}>
            {children}
        </Grid>
     );
}

export default GridCenter;