const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <p className="mt-4 text-sm text-red-600 dark:text-red-400">
      {message}
    </p>
  );
};

export default ErrorMessage;
