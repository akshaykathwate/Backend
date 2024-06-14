
const asyncHandler = (requesthandler) =>{
    return (req,res,next) =>{
        Promise.resolve(requesthandler(req,res,next))
        .catch((err) =>next(err))
    }
}
// const asyncHandler = (func) => async (req,res,next)  =>
//     {
//         try{
//             await func(next, req, res);
//         } catch(err){
//             res.status(err.code || 500).json({
//                 success: false,
//                 messege:err.message
//              })
//      } }

export {asyncHandler} ;