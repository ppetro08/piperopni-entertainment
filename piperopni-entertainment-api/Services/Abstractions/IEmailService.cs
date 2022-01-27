namespace piperopni_entertainment_api.Services.Abstractions
{
    public interface IEmailService
    {
        public Task SendEmailAsync(string email, string subject, string message);
        public Task Execute(string apiKey, string subject, string message, string email);
    }
}
