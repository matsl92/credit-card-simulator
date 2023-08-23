// import { TransactionInterface } from "@components/basic/Transaction";
// import { insert } from "@src/redux/features/db/dbSlice";
// import { useAppDispatch } from "@src/redux/hooks";

// // export default function useFetchData(transaction: TransactionInterface) {
//     export default function useFetchData() {
//     const dispatch = useAppDispatch();
//     // dispatch(insert(transaction));
//     return (transaction: TransactionInterface) => {
//         dispatch(insert(transaction));
//     }
// }


import { TransactionInterface } from "@components/basic/Transaction";
import { insert } from "@src/redux/features/db/dbSlice";
import { useAppDispatch } from "@src/redux/hooks";

export default function useFetchData(transaction: TransactionInterface) {
    const dispatch = useAppDispatch();
    dispatch(insert(transaction));
}