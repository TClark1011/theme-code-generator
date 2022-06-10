// Use as the first function of `flow` to define the type of the parameter.
const expectParam =
  <Param>() =>
  (val: Param): Param =>
    val;

export default expectParam;
