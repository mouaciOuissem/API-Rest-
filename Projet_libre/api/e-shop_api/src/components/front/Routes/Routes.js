import React from 'react';
import Products from "./Products/Products";
import { Route , Switch} from "react-router-dom";


const Routes = (productItems) => {
    return (
        <div>
            <Switch>
                <Route path="/" exact>
                    <Products productItems={productItems}/>
                </Route>
            </Switch>
        </div>
    )
        
    
}
export default Routes;