#!/usr/bin/env bash

function start_ssh_agent() {
    which ssh-agent || exit 255

    INFO=/tmp/ssh-agent-${1}

    ssh-agent -s > ${INFO}
    source ${INFO}
}

function kill_sshagent() {
    INFO=/tmp/ssh-agent-${1}

    if [[ -f ${INFO} ]]; then
        source ${INFO}
        ssh-agent -k
        rm -f ${INFO}
    fi
}