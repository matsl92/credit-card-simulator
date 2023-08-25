import TotalBar, { TotalBarInterface } from "@components/basic/TotalBar";
import Cycle, { CycleInterface } from "@components/complex/Cycle";
import { Stack } from "@mui/material";

export interface OutlookInterface {
    cycles: CycleInterface[],
    totalBar: TotalBarInterface
}

export default function Outlook({
    cycles,
    totalBar
}: OutlookInterface) {

    return (
        <Stack spacing={4} useFlexGap flexWrap="nowrap">
            {
                cycles.map((cycle, index) => (
                    <Cycle {...cycle} key={index}/>
                ))
            }
            <TotalBar {...totalBar}/>
        </Stack>
    )
}