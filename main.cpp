#include <iostream>
#include "lib/Algorithm.h"
#include "utils/Utils.h"

#define TEST_FILES "sources"
#define NUMBER_OF_TESTS 2

using namespace std;

bool test(int index) {

    cout << "Starting test #" << index << endl;

    string f_in_name = string(TEST_FILES) + "/input/" + to_string(index) + ".txt";
    string f_out_name = string(TEST_FILES) + "/output/" + to_string(index) + ".txt";

    auto matrix = Utils::parse_matrix(f_in_name);
    auto output_matrix = Utils::parse_matrix(f_out_name);


    auto generated_matrix = Algorithm::process(matrix);
    bool same = Utils::compare_matrices(output_matrix, generated_matrix);

    Utils::print_matrix(generated_matrix);

    cout << "Ending test #" << index << endl << endl;

    return same;
}

int main() {
    cout << "Starting algorithm!" << endl << endl;
    for (int i = 0; i < NUMBER_OF_TESTS; ++i) {
        bool val = test(i);
        if (!val) {
            cerr << "Failed on test #" << i << endl;
            break;
        }
    }
    cout << "Finished algorithm!" << endl;
    return 0;
}
