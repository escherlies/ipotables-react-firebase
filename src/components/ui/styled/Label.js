import React from 'react';

export default function Label(props) {

  return <div style={styles.label}>
    <div style={styles.text}>
      {props.children}
    </div>
  </div>
}


const styles = {
  label: {
    height: 22,
    paddingLeft: 8,
  },
  text: {
    fontSize: 14,
  }
}
