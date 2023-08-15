import { Grid, Typography, Box } from "@mui/material";

interface TableHeadersInterface {
    headers: {string: string, columns?: number}[]
}
function TableHeaders({headers}: TableHeadersInterface) {
    let totalColumns = 0;
    for (let item of headers) {
        if (item.columns !== undefined) {
            totalColumns += item.columns;
        } else {
            totalColumns += 1;
        }
    }
    return (
        <Grid container columns={totalColumns} sx={{
            width: '95%',
            margin: 'auto',
            paddingY: '5px',
        }}>
            {
                headers.map((header, index) => {
                    let columns = header.columns?? 1;
                    return (
                        <Grid key={index} md={columns} sm={columns} lg={columns} item>
                            <Box sx={{paddingX: '10px'}}>
                                <Typography variant="subtitle2" align="center" sx={{
                                    fontWeight: 600,
                                }}>
                                    {header.string}
                                </Typography>
                            </Box>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default TableHeaders;