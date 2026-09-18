namespace CryptoDashWeb.Core.Models.OperationResult
{
    public class OperationResultData<T> : OperationResult where T : class
    {
        public T? Data { get; }

        public OperationResultData(T? data, ResultCode code) : base(code)
        {
            Data = data;
        }

        public OperationResultData(T? data, ResultCode code, string? description) : base(code, description)
        {
            Data = data;
        }

        public OperationResultData(OperationResult operationResult, T data) : this(data, operationResult.Code, operationResult.Description) { }
    }
}
