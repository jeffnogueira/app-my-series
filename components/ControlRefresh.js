import React, {Component} from 'react';
import { RefreshControl } from 'react-native';

class ControlRefresh extends Component {

    wait(timeout) {
      return new Promise(resolve => {
        setTimeout(resolve, timeout);
      });
    }

    render(){
        const [refreshing, setRefreshing] = React.useState(false);

        return (
            <RefreshControl refreshing={refreshing}
                onRefresh={React.useCallback(() => {
                    setRefreshing(true);
                    wait(2000).then(() => setRefreshing(false));
                }, [refreshing])} />
        );
    }
}
export default ControlRefresh