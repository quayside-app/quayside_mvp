# How do I deploy code?

##  Step 1.

Write your tests.

##  Step 2.

run your tests and linter on your code.  In python, that would look like this:

```pytest && pylint *.py --disable C0103,C0303,C0301,R0401,E0401,C0304```

## Step 3.

Write your code and refactor.  Return to step 2 until it passes.

## Step 4.

push your code to the branch you're working on.