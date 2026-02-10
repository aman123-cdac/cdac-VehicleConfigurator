using Microsoft.AspNetCore.Mvc.Filters;

namespace project_vc_.Filter
{
    

    public class ControllerActionLoggingFilter : IActionFilter
    {
        private readonly ILogger<ControllerActionLoggingFilter> _logger;

        public ControllerActionLoggingFilter(ILogger<ControllerActionLoggingFilter> logger)
        {
            _logger = logger;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var controller = context.RouteData.Values["controller"];
            var action = context.RouteData.Values["action"];

            _logger.LogInformation(
                "Executing {Controller}/{Action} with arguments {@Args}",
                controller,
                action,
                context.ActionArguments
            );
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            var controller = context.RouteData.Values["controller"];
            var action = context.RouteData.Values["action"];

            if (context.Exception != null)
            {
                _logger.LogError(
                    context.Exception,
                    "Exception in {Controller}/{Action}",
                    controller,
                    action
                );
            }
            else
            {
                _logger.LogInformation(
                    "Executed {Controller}/{Action} successfully",
                    controller,
                    action
                );
            }
        }
    }
}
