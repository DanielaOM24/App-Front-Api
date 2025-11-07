import mongoose,{Schema,Document,Model} from "mongoose";


export interface Product extends Document{
    correo: string;
    password: string;
}

const Products = new Schema<Product>(
    {
        correo:{type:String, required:true},
        password:{type:String, required:true}
    }
)

const Store: Model<Product>=(mongoose.models.Store as Model<Product>) || mongoose.model<Product>('Product', Products);

export default Store;