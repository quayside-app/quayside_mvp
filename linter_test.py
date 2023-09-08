"""Module for linter test"""
def linter_does_it_work(test: str) -> int:
    """
    This function returns the number 1.

    Testing start of pipeline again

    :param test: A dummy variable.
    :return: The number 1.
    """
    print(test)
    return 1


if __name__ == "__main__":
    print(linter_does_it_work("test!"))