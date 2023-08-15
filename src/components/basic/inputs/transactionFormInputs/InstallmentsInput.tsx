// import MenuItem from '@mui/material/MenuItem';
// import { useState } from 'react';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import { OutlinedInput } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


function TransactionInstallmentsInput() {

  return (
    <FormControl sx={{ m: 1, width: '18ch' }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-interest-rate">Installments</InputLabel>
      <OutlinedInput
        id="outlined-adornment-interest-rate"
        type={'number'}
        label="Installments"
        />
    </FormControl>
  )
}

export default TransactionInstallmentsInput;

/*
By default, this value will be and empty string.
*/

// export default function TransactionInstallmentsInput2() {
//   const [nInstallments, setNInstallments] = useState('');

//   const handleChange = (event: SelectChangeEvent) => {
//     setNInstallments(event.target.value);
//   };

//   return (
//     <FormControl sx={{ m: 1, minWidth: 140 }} size="medium">
//       <InputLabel id="demo-select-label">Installments</InputLabel>
//       <Select
//         labelId="demo-select-label"
//         id="demo-select-small"
//         value={nInstallments}
//         label="Installments"
//         onChange={handleChange}
//         size="medium"
//       >
//         {/* <MenuItem value={1}><em>None</em></MenuItem> */}
//         {/* <MenuItem value={1}><em>None</em></MenuItem> */}
//         <MenuItem value={1}>1</MenuItem>
//         <MenuItem value={2}>2</MenuItem>
//         <MenuItem value={3}>3</MenuItem>
//         <MenuItem value={4}>4</MenuItem>
//         <MenuItem value={5}>5</MenuItem>
//         <MenuItem value={6}>6</MenuItem>
//         <MenuItem value={7}>7</MenuItem>
//         <MenuItem value={8}>8</MenuItem>
//         <MenuItem value={9}>9</MenuItem>
//         <MenuItem value={10}>10</MenuItem>
//         <MenuItem value={11}>11</MenuItem>
//         <MenuItem value={12}>12</MenuItem>
//         <MenuItem value={13}>13</MenuItem>
//         <MenuItem value={14}>14</MenuItem>
//         <MenuItem value={15}>15</MenuItem>
//         <MenuItem value={16}>16</MenuItem>
//         <MenuItem value={17}>17</MenuItem>
//         <MenuItem value={18}>18</MenuItem>
//         <MenuItem value={19}>19</MenuItem>
//         <MenuItem value={20}>20</MenuItem>
//         <MenuItem value={21}>21</MenuItem>
//         <MenuItem value={22}>22</MenuItem>
//         <MenuItem value={23}>23</MenuItem>
//         <MenuItem value={24}>24</MenuItem>
//         <MenuItem value={25}>25</MenuItem>
//         <MenuItem value={26}>26</MenuItem>
//         <MenuItem value={27}>27</MenuItem>
//         <MenuItem value={28}>28</MenuItem>
//         <MenuItem value={29}>29</MenuItem>
//         <MenuItem value={30}>30</MenuItem>
//         <MenuItem value={31}>31</MenuItem>
//         <MenuItem value={32}>32</MenuItem>
//         <MenuItem value={33}>33</MenuItem>
//         <MenuItem value={34}>34</MenuItem>
//         <MenuItem value={35}>35</MenuItem>
//         <MenuItem value={36}>36</MenuItem>
//       </Select>
//     </FormControl>
//   );
// }


