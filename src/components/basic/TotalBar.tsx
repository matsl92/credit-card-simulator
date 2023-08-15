import { Paper, Grid, Typography } from "@mui/material";
import TableHeaders from "./TableHeaders";

export interface TotalBarInterface {
    paidCapital: number,
    paidInterests: number,

}

function TotalBar(props: TotalBarInterface) {
    const { paidCapital, paidInterests } = props;
    return (
        <Paper onClick={() => console.log('Edit transaction')} elevation={2} sx={{
            width: '1000px', 
            borderRadius: '12px',
            marginX: 'auto',
            py: "10px"
        }}>
            <Typography variant="h5" align="center" sx={{py: '20px'}}>
               Summary 
            </Typography>

            <TableHeaders headers={[
                {string: ''},
                {string: 'Paid capital'},
                {string: 'Paid interests'},
                {string: 'Total paid'},
                {string: ''},
            ]}/>

            <Grid container columns={10} sx={{
                width: '95%',
                paddingY: '10px',
                marginX: 'auto',
                borderTop: '1px solid rgb(228, 228, 228)',
            }}>
                <Grid md={2} sm={2} lg={2} item>
                    <Typography variant='body2'></Typography>
                </Grid>
                <Grid md={2} sm={2} lg={2} item>
                    <Typography variant='body2' align='center'>{Math.round(paidCapital).toLocaleString('es-ES')}</Typography>
                </Grid>
                <Grid md={2} sm={2} lg={2} item>
                    <Typography variant='body2' align='center'>{Math.round(paidInterests).toLocaleString('es-ES')}</Typography>
                </Grid>
                <Grid md={2} sm={2} lg={2} item>
                    <Typography variant='body2' align='center'>{Math.round(paidCapital + paidInterests).toLocaleString('es-ES')}</Typography>
                </Grid>
                <Grid md={2} sm={2} lg={2} item>
                    <Typography variant='body2'>{}</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default TotalBar;