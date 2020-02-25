#include "Utils.h"


vector<vector<int>> Utils::parse_matrix(string filename) {

    ifstream ifile(filename);
    vector<vector<int>> matrix;

    string line;
    if (ifile.is_open()) {
        while (getline(ifile, line)) {
            istringstream iss(line);
            vector<int> v;
            for (int val; iss >> val;) {
                v.push_back(val);
            }
            matrix.push_back(v);
        }
        ifile.close();
    } else cout << "Unable to open file " << filename << endl;


    return matrix;
}

bool Utils::compare_matrices(vector<vector<int>> a, vector<vector<int>> b) {
    if (a.size() != b.size()) return false;
    auto size = a.size();

    for (int i = 0; i < size; ++i) {
        auto v_a = a.at(i);
        auto v_b = b.at(i);
        if (v_a != v_b) return false;
    }

    return true;
}

void Utils::print_matrix(vector<vector<int>> matrix) {
    for (vector<int> v: matrix) {
        for (int i: v) {
            cout << i << " ";
        }
        cout << endl;
    }
}
