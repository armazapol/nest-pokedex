export const EnvConfiguration = () => ({
    enviroment:process.env.NODE_ENV || 'dev',
    mongodb:process.env.MONGODB,
    port: process.env.PORT || 3002,
    default_limit: process.env.DEFAULT_LIMIT || 7
});


// la funcion de arriba es igual al de abajo, retornará un objeto
// const envfb = () => {
//   return {};
// };
