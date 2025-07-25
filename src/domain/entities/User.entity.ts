import mongoose from "mongoose";

export const userEntity = () => {
	let userSchema = new mongoose.Schema(
		{
			name: String,
			email: String,
			age: Number
		},
		{
			collection: 'Users'
		}
	)
	return mongoose.models.Users || mongoose.model('Users', userSchema); //aignamos la colecion  al modelo correspondiente
}
