
class ErrorHandler extends Error{
    public statusCode:number = 500;
    public message: string = "something went wrong";
    constructor(error:string,statusCode:number)
    {
        super(error);
        this.message = error;
        this.statusCode = statusCode;
    }
}


export default ErrorHandler;