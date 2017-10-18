UPDATE booklist
set wantedmatch = $1, tradeinmatch = $2, count = $3
where user_name = $4