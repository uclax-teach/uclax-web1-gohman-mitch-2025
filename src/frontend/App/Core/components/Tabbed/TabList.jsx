import PropTypes from "prop-types";

import TabItem from "./TabItem";

const TabList = ({ tabs, curTab, curTabUpdate }) => {
    return (
        <div>
            {tabs.map((tab) => {
                return (
                    <TabItem
                        key={tab.id}
                        tab={tab}
                        curTab={curTab}
                        curTabUpdate={curTabUpdate}
                    />
                );
            })}
        </div>
    );
};

export default TabList;

// prop-types
TabList.propTypes = {
    tabs: PropTypes.array.isRequired,
    curTab: PropTypes.object.isRequired,
    curTabUpdate: PropTypes.func.isRequired,
};
