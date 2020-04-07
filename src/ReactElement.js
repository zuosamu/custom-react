const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    $$typeof: "一个特征值",
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner
  };
  /**
   * 进行一系列的跟store有关的操作
   */
  return element;
};

export function createElement(type, config, children) {
  /**
   * 这里是处理内部属性
   */
  let propName;
  const props = {};
  let key = null;
  let ref = null;
  let self = null;
  let source = null;
  if (config != null) {
    //在这之前还要教研ref和key的合法性
    ref = config.ref;
    key = "" + config.key;
    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    //遍历config 剔除内建的几个属性
    for (propName in config) {
      props[propName] = config[propName];
    }
  }
  /**
   * 这里是处理children
   * children这里是第三个参数传入的
   * 把children绑定到props上面
   * 分为单个node和数组，
   * 分别处理
   *
   */
  const childrenLength = arguments.length - 2;
  //单个
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }
  /**
   * 接下来判断是否存在默认的props
   * 有的化，就赋值
   * 这里有疑问
   * type一般是字符串，一般没有defaultProps属性
   */
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    //这个暂时不知道干什么的
    ReactCurrentOwner.current,
    props
  );
}
