const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  loading,
  fetchPriority,
  ...rest
}) => {
  const resolvedLoading = loading ?? (priority ? "eager" : "lazy");
  const resolvedFetchPriority = fetchPriority ?? (priority ? "high" : undefined);

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={resolvedLoading}
      decoding="async"
      fetchPriority={resolvedFetchPriority}
      className={className}
      {...rest}
    />
  );
};

export default OptimizedImage;

