#!/bin/bash
#|---/ /+------------------+---/ /|#
#|--/ /-| Global functions |--/ /-|#
#|-/ /--| Prasanth Rangan  |-/ /--|#
#|/ /---+------------------+/ /---|#

set -e

CloneDir=`dirname $(dirname $(realpath $0))`

service_ctl()
{
    local ServChk=$1

    if [[ $(systemctl list-units --all -t service --full --no-legend "${ServChk}.service" | sed 's/^\s*//g' | cut -f1 -d' ') == "${ServChk}.service" ]]
    then
        echo "$ServChk service is already enabled, enjoy..."
    else
        echo "$ServChk service is not running, enabling..."
        sudo systemctl enable ${ServChk}.service
        sudo systemctl start ${ServChk}.service
        echo "$ServChk service enabled, and running..."
    fi
}
