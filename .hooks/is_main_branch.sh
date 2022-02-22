#!/bin/bash
set -e

branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
if [ "$branch" == "main" ]
then
	    echo "Not allowed to commit/push directly on main. Please use pull request"
	    exit 1
fi
