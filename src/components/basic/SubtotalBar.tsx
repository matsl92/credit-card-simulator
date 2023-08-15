import { Box, Grid, Typography } from "@mui/material"

export interface SubtotalBarInterface {
    paidCapital: number,
    paidInterests: number,
    remainingCapital: number,
    remainingInterests: number
}

function SubtotalBar(props: SubtotalBarInterface) {
    const {paidCapital, paidInterests, remainingCapital, remainingInterests } = props;
    return (
        <Grid container columns={16} sx={{
            width: '95%',
            paddingY: '10px',
            marginX: 'auto',
            borderTop: '1px solid rgb(170, 170, 170)',
        }}>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='center' sx={{fontWeight: 600}}>
                        {}
                    </Typography>
                </Box>
            </Grid>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='center' sx={{fontWeight: 600}}>
                        {}
                    </Typography>
                </Box>
            </Grid>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='right' sx={{fontWeight: 600}}>
                        {Math.round(paidCapital).toLocaleString()}
                    </Typography>
                </Box>
            </Grid>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='right' sx={{fontWeight: 600}}>
                        {Math.round(paidInterests).toLocaleString()}
                    </Typography>
                </Box>
            </Grid>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='right' sx={{fontWeight: 600}}>
                        {Math.round(paidCapital + paidInterests).toLocaleString()}
                    </Typography>
                </Box>
            </Grid>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='right' sx={{fontWeight: 600}}>
                        {Math.round(remainingCapital).toLocaleString()}
                    </Typography>
                </Box>
            </Grid>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='right' sx={{fontWeight: 600}}>
                        {Math.round(remainingInterests).toLocaleString()}
                    </Typography>
                </Box>
            </Grid>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='right' sx={{fontWeight: 600}}>
                        {Math.round(remainingCapital + remainingInterests).toLocaleString()}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default SubtotalBar;