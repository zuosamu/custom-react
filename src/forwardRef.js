export function forwardRef(render) {
  return {
    $$typeof: "forwardRef",
    render
  };
}
