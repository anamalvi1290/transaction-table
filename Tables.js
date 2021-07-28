import userImage from "../../assets/img/pngs/work3.png";
import Records from "./Mock";
import { BaseTable } from "./BaseTable";

export const Tables = () => {
    return (
        <div className="inner-body">
            <div className="page-header">
             
                                </div>
                                <label className="main-content-label mb-2">Transcations</label>                
                                <BaseTable Records={Records} />         
        </div>
    )
}
